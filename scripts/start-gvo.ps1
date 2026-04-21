#!/usr/bin/env pwsh
$ErrorActionPreference = 'Stop'

function Invoke-Checked([string]$Command, [string[]]$Arguments) {
  & $Command @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "Command failed: $Command $($Arguments -join ' ')"
  }
}

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

Get-Command node | Out-Null
Get-Command npm | Out-Null

Write-Host 'Building GVO for local Windows pilot...'
Invoke-Checked 'npm' @('run', 'build')

Write-Host ''
Write-Host 'Starting GVO local pilot...'
Write-Host 'Backend + frontend compiled will be served from Fastify.'
Write-Host 'Expected URL: http://localhost:3001'
Write-Host ''

Invoke-Checked 'npm' @('run', 'start:local', '--workspace=apps/server')
