#!/usr/bin/env pwsh
param(
  [string]$TaskName = 'GVO Local Autostart',
  [string]$TaskPath = '\'
)

$ErrorActionPreference = 'Stop'

function Get-CurrentUserName {
  return [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
}

$taskName = $TaskName.Trim()
$taskPathValue = if ([string]::IsNullOrWhiteSpace($TaskPath)) { '\' } else { $TaskPath.Trim() }
if (-not $taskPathValue.EndsWith('\')) {
  $taskPathValue += '\'
}

$task = Get-ScheduledTask -TaskName $taskName -TaskPath $taskPathValue -ErrorAction SilentlyContinue
if (-not $task) {
  Write-Host "No scheduled task found for '$taskPathValue$taskName'. Nothing to remove."
  exit 0
}

try {
  Stop-ScheduledTask -TaskName $taskName -TaskPath $taskPathValue -ErrorAction SilentlyContinue | Out-Null
} catch {
  # If it is not running, continue with removal.
}

Unregister-ScheduledTask -TaskName $taskName -TaskPath $taskPathValue -Confirm:$false

Write-Host 'Scheduled Task removed.'
Write-Host "Task name: $taskName"
Write-Host "Task path: $taskPathValue"
Write-Host "User context: $(Get-CurrentUserName)"
