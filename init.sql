-- ============================================================
-- 暗影飞投 - 数据库初始化脚本
-- 使用方式: psql -U <username> -d <database> -f init.sql
-- ============================================================

-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  admin_secret_hash TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  tg_session_string TEXT
);

-- 卡密表
CREATE TABLE IF NOT EXISTS card_keys (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  user_id INTEGER,
  expires_at TIMESTAMP,
  activated_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  note TEXT
);

-- 商店配置表（全局单行配置）
CREATE TABLE IF NOT EXISTS shop_config (
  id SERIAL PRIMARY KEY,
  kkpay_id TEXT NOT NULL DEFAULT '',
  kkpay_secret TEXT NOT NULL DEFAULT '',
  domain TEXT NOT NULL DEFAULT '',
  product_name TEXT NOT NULL DEFAULT '暗影飞投-卡密',
  price_daily_usdt TEXT NOT NULL DEFAULT '1',
  price_weekly_usdt TEXT NOT NULL DEFAULT '5',
  price_monthly_usdt TEXT NOT NULL DEFAULT '15',
  enabled BOOLEAN NOT NULL DEFAULT false,
  bot_token TEXT DEFAULT '',
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 商店订单表
CREATE TABLE IF NOT EXISTS shop_orders (
  id SERIAL PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  card_type TEXT NOT NULL,
  amount_usdt TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  card_key_id INTEGER,
  pay_url TEXT,
  tg_chat_id TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMP
);

-- KKPay 密码操作日志表
CREATE TABLE IF NOT EXISTS kkpay_pwd_log (
  id SERIAL PRIMARY KEY,
  event_id TEXT NOT NULL UNIQUE,
  timestamp BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  username TEXT NOT NULL,
  event TEXT NOT NULL,
  text TEXT NOT NULL,
  context TEXT
);

-- KKPay 日志时间戳索引
CREATE INDEX IF NOT EXISTS kkpay_pwd_log_ts_idx ON kkpay_pwd_log (timestamp);
