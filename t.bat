@echo off
REM ==========================================
REM Create directory structure for Frontend
REM ==========================================

REM List of directories
set DIRS=frontend\public ^
         frontend\src\assets\images ^
         frontend\src\assets\styles ^
         frontend\src\components\layout ^
         frontend\src\components\forms ^
         frontend\src\components\tables ^
         frontend\src\pages\Auth ^
         frontend\src\pages\Applications ^
         frontend\src\pages\Documents ^
         frontend\src\pages\Offers ^
         frontend\src\pages\Reports ^
         frontend\src\services ^
         frontend\src\hooks ^
         frontend\src\utils

REM Create directories
for %%D in (%DIRS%) do (
    if not exist "%%D" mkdir "%%D"
)

REM ==========================================
REM Create empty files
REM ==========================================
(
    REM Public
    echo.> frontend\public\index.html
    echo.> frontend\public\favicon.ico
    echo.> frontend\public\manifest.json

    REM Styles
    echo.> frontend\src\assets\styles\global.css
    echo.> frontend\src\assets\styles\variables.css

    REM Layout components
    echo.> frontend\src\components\layout\Navbar.js
    echo.> frontend\src\components\layout\Sidebar.js
    echo.> frontend\src\components\layout\Footer.js
    echo.> frontend\src\components\layout\ProtectedRoute.js

    REM Forms
    echo.> frontend\src\components\forms\InputField.js
    echo.> frontend\src\components\forms\FileUpload.js
    echo.> frontend\src\components\forms\SelectDropdown.js

    REM Tables
    echo.> frontend\src\components\tables\ApplicationsTable.js
    echo.> frontend\src\components\tables\ReportsTable.js

    REM Pages - Auth
    echo.> frontend\src\pages\Auth\LoginPage.js
    echo.> frontend\src\pages\Auth\ResetPasswordPage.js

    REM Pages - Applications
    echo.> frontend\src\pages\Applications\ViewApplications.js
    echo.> frontend\src\pages\Applications\CreateApplication.js
    echo.> frontend\src\pages\Applications\EditApplication.js
    echo.> frontend\src\pages\Applications\DeleteApplication.js

    REM Pages - Documents
    echo.> frontend\src\pages\Documents\UploadDocuments.js

    REM Pages - Offers
    echo.> frontend\src\pages\Offers\ViewOffer.js
    echo.> frontend\src\pages\Offers\AcceptOffer.js

    REM Pages - Reports
    echo.> frontend\src\pages\Reports\DownloadReport.js

    REM Misc Pages
    echo.> frontend\src\pages\NotFound.js

    REM Services
    echo.> frontend\src\services\authService.js
    echo.> frontend\src\services\applicationService.js
    echo.> frontend\src\services\documentService.js
    echo.> frontend\src\services\offerService.js
    echo.> frontend\src\services\reportService.js

    REM Hooks
    echo.> frontend\src\hooks\useAuth.js
    echo.> frontend\src\hooks\useFetch.js

    REM Utils
    echo.> frontend\src\utils\constants.js
    echo.> frontend\src\utils\validators.js
    echo.> frontend\src\utils\formatters.js

    REM Root files
    echo.> frontend\src\App.js
    echo.> frontend\src\index.js
    echo.> frontend\src\routes.js
    echo.> frontend\src\setupTests.js
    echo.> frontend\package.json
    echo.> frontend\package-lock.json
    echo.> frontend\.env.example
    echo.> frontend\README.md
)

echo Frontend project structure created successfully!
pause
