Start database:
```bash
docker compose -f docker-compose.yml up -d
```

Stop database:
```bash
docker compose -f docker-compose.yml down
```

Check Running Process
```bash
sudo lsof -i -P -n
```

Install ESLint with configurations prompt
```bash
npm init @eslint/config
```

Apply ESLint configuration to code
```bash
npx eslint ./src --fix
```