@echo off
D:
cd Skole\H3\PWE\Project\BookPub
docfx init -q
docfx docfx_project/docfx.json
docfx serve docfx_project/_site
pause
