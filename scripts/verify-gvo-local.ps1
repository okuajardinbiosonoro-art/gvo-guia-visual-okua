#!/usr/bin/env pwsh
param(
  [string]$BaseUrl = $env:GVO_VERIFY_BASE_URL,
  [int]$TimeoutSec = 10
)

$ErrorActionPreference = 'Stop'

function Normalize-BaseUrl([string]$Value) {
  $trimmed = if ($null -eq $Value) { '' } else { $Value.Trim() }
  if ([string]::IsNullOrWhiteSpace($trimmed)) {
    return 'http://localhost:3001'
  }
  return $trimmed.TrimEnd('/')
}

function Invoke-CurlCheck {
  param(
    [string]$Name,
    [string]$Path
  )

  $uri = "$script:BaseUrlValue$Path"
  $sw = [System.Diagnostics.Stopwatch]::StartNew()
  $tempFile = [System.IO.Path]::GetTempFileName()

  try {
    $statusCodeText = & curl.exe -sS -L -o $tempFile -w "%{http_code}" --max-time $TimeoutSec $uri
    $sw.Stop()

    $statusCode = 0
    [void][int]::TryParse(($statusCodeText | Select-Object -Last 1), [ref]$statusCode)

    $content = ''
    if (Test-Path -LiteralPath $tempFile) {
      $content = Get-Content -LiteralPath $tempFile -Raw -ErrorAction SilentlyContinue
    }

    return [pscustomobject]@{
      Name = $Name
      Ok = $statusCode -eq 200 -and -not [string]::IsNullOrWhiteSpace($content)
      Status = $statusCode
      Ms = [math]::Round($sw.Elapsed.TotalMilliseconds)
      Detail = $content
    }
  } catch {
    $sw.Stop()
    return [pscustomobject]@{
      Name = $Name
      Ok = $false
      Status = $null
      Ms = [math]::Round($sw.Elapsed.TotalMilliseconds)
      Detail = $_.Exception.Message
    }
  } finally {
    if (Test-Path -LiteralPath $tempFile) {
      Remove-Item -LiteralPath $tempFile -Force -ErrorAction SilentlyContinue
    }
  }
}

function Assert-Health([string]$JsonText) {
  $payload = $JsonText | ConvertFrom-Json -ErrorAction Stop
  if ($null -eq $payload) {
    return @{ Ok = $false; Detail = 'expected JSON body, got null' }
  }
  if ($payload.status -ne 'ok') {
    return @{ Ok = $false; Detail = "expected status=ok, got $($payload.status)" }
  }
  return @{ Ok = $true; Detail = "status=$($payload.status)" }
}

function Assert-Meta([string]$JsonText) {
  $payload = $JsonText | ConvertFrom-Json -ErrorAction Stop
  if ($null -eq $payload) {
    return @{ Ok = $false; Detail = 'expected JSON body, got null' }
  }
  if ($payload.status -ne 'journey-core-live') {
    return @{ Ok = $false; Detail = "expected status=journey-core-live, got $($payload.status)" }
  }
  if ($null -eq $payload.features -or $payload.features.stations -ne $true) {
    return @{ Ok = $false; Detail = 'expected features.stations=true' }
  }
  return @{ Ok = $true; Detail = "status=$($payload.status); stations=$($payload.features.stations)" }
}

$script:BaseUrlValue = Normalize-BaseUrl $BaseUrl

Write-Host 'GVO local verification'
Write-Host "Base URL: $script:BaseUrlValue"
Write-Host ''

$checks = @(
  @{ Name = 'health'; Path = '/health' },
  @{ Name = 'meta'; Path = '/api/meta' },
  @{ Name = 'root'; Path = '/' }
)

$results = foreach ($check in $checks) {
  $curlResult = Invoke-CurlCheck -Name $check.Name -Path $check.Path

  if ($check.Name -eq 'root') {
    $curlResult.Ok = $curlResult.Status -eq 200 -and -not [string]::IsNullOrWhiteSpace($curlResult.Detail)
    if ($curlResult.Ok) {
      $curlResult.Detail = 'HTML content served'
    } elseif ($curlResult.Status -eq 200) {
      $curlResult.Detail = 'expected non-empty HTML content'
    }
  } elseif ($curlResult.Ok) {
    try {
      $result = if ($check.Name -eq 'health') {
        Assert-Health $curlResult.Detail
      } else {
        Assert-Meta $curlResult.Detail
      }
      $curlResult.Ok = [bool]($result -and $result.Ok)
      $curlResult.Detail = if ($null -ne $result) { $result.Detail } else { 'validator returned no result' }
    } catch {
      $curlResult.Ok = $false
      $curlResult.Detail = $_.Exception.Message
    }
  }

  $mark = if ($curlResult.Ok) { '✓' } else { '✗' }
  $statusText = if ($null -ne $curlResult.Status) { "HTTP $($curlResult.Status)" } else { 'no response' }
  Write-Host "$mark $($check.Path) - $statusText - $($curlResult.Ms) ms"
  if (-not $curlResult.Ok) {
    Write-Host "  $($curlResult.Detail)"
  }

  $curlResult
}

$failed = @($results | Where-Object { -not $_.Ok })

Write-Host ''
if ($failed.Count -eq 0) {
  Write-Host 'All quick checks passed.'
  exit 0
}

Write-Host "Quick check failed: $($failed.Count) item(s)."
exit 1
