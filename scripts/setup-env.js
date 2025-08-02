const fs = require("fs");
const path = require("path");

// 실행한 디렉토리의 .env 파일 경로 (process.cwd() 사용)
const currentEnvPath = path.join(process.cwd(), ".env");
const envExamplePath = path.join(__dirname, "../.env.example");

function setupEnv() {
  console.log("🔧 Setting up environment variables...");
  console.log(`📁 Current directory: ${process.cwd()}`);

  // .env.example 파일 읽기
  let envTemplate;
  try {
    if (fs.existsSync(envExamplePath)) {
      envTemplate = fs.readFileSync(envExamplePath, "utf8");
      console.log("📖 Reading .env.example file...");
    } else {
      throw new Error(
        "⚠️  .env.example file not found, using default template"
      );
    }
  } catch (error) {
    console.error("❌ Error reading .env.example:", error.message);
    return;
  }

  // 실행한 디렉토리에 .env 파일이 없으면 생성
  if (!fs.existsSync(currentEnvPath)) {
    console.log(`📝 Creating .env file in current directory: ${process.cwd()}`);
    fs.writeFileSync(currentEnvPath, envTemplate);
    console.log("✅ Created .env file in current directory");
  } else {
    console.log("✅ .env file already exists in current directory");
  }

  console.log("🎉 Environment setup completed!");
  console.log(
    "💡 .env file created in the directory where the script was executed"
  );
}

// 스크립트 실행
setupEnv();
