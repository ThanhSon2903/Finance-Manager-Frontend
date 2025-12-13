// utils/validation.js
export const validateEmail = (email) => {
    
    if (!email || typeof email !== "string") return false;
  
    const value = email.trim();
  
    // regex chuẩn, chấp nhận hầu hết địa chỉ email hợp lệ (không quá phức tạp)
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
    return regex.test(value);
  };
  