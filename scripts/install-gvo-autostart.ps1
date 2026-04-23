#!/usr/bin/env pwsh
param(
  [string]$TaskName = 'GVO Local Autostart',
  [string]$TaskPath = '\',
  [switch]$StartNow
)

$ErrorActionPreference = 'Stop'

function Get-CurrentUserName {
  return [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$startScript = Join-Path $repoRoot 'scripts\start-gvo.ps1'
$taskName = $TaskName.Trim()
$taskPathValue = if ([string]::IsNullOrWhiteSpace($TaskPath)) { '\' } else { $TaskPath.Trim() }
if (-not $taskPathValue.EndsWith('\')) {
  $taskPathValue += '\'
}

if (-not (Test-Path $startScript)) {
  throw "No se encontró el script de arranque: $startScript"
}

Get-Command powershell.exe | Out-Null

$actionArguments = "-NoProfile -ExecutionPolicy Bypass -File `"$startScript`""
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument $actionArguments -WorkingDirectory $repoRoot
$trigger = New-ScheduledTaskTrigger -AtLogOn -User (Get-CurrentUserName)
$principal = New-ScheduledTaskPrincipal -UserId (Get-CurrentUserName) -LogonType Interactive -RunLevel Limited
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -MultipleInstances IgnoreNew -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
$task = New-ScheduledTask -Action $action -Trigger $trigger -Principal $principal -Settings $settings

Register-ScheduledTask -TaskName $taskName -TaskPath $taskPathValue -InputObject $task -Force | Out-Null

Write-Host 'Scheduled Task installed.'
Write-Host "Task name: $taskName"
Write-Host "Task path: $taskPathValue"
Write-Host "User context: $(Get-CurrentUserName)"
Write-Host "Working directory: $repoRoot"
Write-Host "Command: powershell.exe $actionArguments"
Write-Host 'Trigger: At log on of the current user'

if ($StartNow) {
  Start-ScheduledTask -TaskName $taskName -TaskPath $taskPathValue
  Write-Host 'Task started immediately because -StartNow was specified.'
}
