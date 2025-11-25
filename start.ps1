# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; npm run dev"

# Wait a moment
Start-Sleep -Seconds 2

# Start frontend in new window  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm run dev"

Write-Host "Servers starting in separate windows..."
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend: http://localhost:5000"
