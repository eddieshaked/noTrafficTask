# Backend Installation Notes

## SQLite Database Setup

The backend uses `better-sqlite3` which requires native compilation. You need to install build tools before running `npm install`.

### Installing better-sqlite3 on Windows

#### Step 1: Install Visual Studio Build Tools

1. Download [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)
2. Run the installer
3. **Important**: Select "Desktop development with C++" workload during installation
4. Complete the installation and restart your computer if prompted

#### Step 2: Install Dependencies

After installing build tools, run:
```bash
cd backend
npm install
```

If `better-sqlite3` fails to install, try:
```bash
npm install better-sqlite3 --build-from-source
```

### Installing better-sqlite3 on Mac

1. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

### Installing better-sqlite3 on Linux

Install build essentials:
```bash
# Ubuntu/Debian
sudo apt-get install build-essential

# Then install dependencies
cd backend
npm install
```

### Troubleshooting

If you get "Cannot find module 'better-sqlite3'" error:

1. **Make sure build tools are installed** (see above)
2. **Try installing directly**:
   ```bash
   cd backend
   npm install better-sqlite3 --build-from-source
   ```
3. **Check the error message** - the backend will provide detailed instructions if the module is missing

### Current Status

- ✅ Express server - Working
- ✅ Winston logger - Working  
- ✅ SQLite database - Required (needs build tools)

