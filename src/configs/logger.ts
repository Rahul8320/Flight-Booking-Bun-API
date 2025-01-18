import { createLogger, format, transports } from "winston";

const customFormat = format.printf(({ timestamp, level, message, stack }) => {
  return `${timestamp}: ${level}: ${message}${stack ? `: ${stack}` : ""}`;
});

const logger = createLogger({
  level: Bun.env.LOG_LEVEL,
  format: format.combine(
    format.timestamp({
      format: Bun.env.TIMESTAMP_FORMAT,
    }),
    format.errors({ stack: true }),
    customFormat
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), customFormat),
    }),
    new transports.File({
      filename: "logs/application.log",
      maxsize: 20 * 1024 * 1024, // Maximum file size: 20MB
      maxFiles: 5, // Keep 5 rotated files
    }),
  ],
});

export default logger;
