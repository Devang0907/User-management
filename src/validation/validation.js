export function validateUserDetails(name,email,phone) {
    // const name=obj.name;
    // const phone=obj.name;
    // const email=obj.email;
    // Check if name is empty or only whitespace
    if (!name || name.trim() === "") {
      alert("Name cannot be empty or blank.");
      return false;
    }
  
    // Validate name
    const isNameValid = /^[a-zA-Z ]+$/.test(name);
    if (!isNameValid) {
      alert("Invalid Name. Name should only contain letters and spaces.");
      return false;
    }
  
    // Check if email is empty or only whitespace
    if (!email || email.trim() === "") {
      alert("Email cannot be empty or blank.");
      return false;
    }
  
    // Validate email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid Email Id. Please enter a valid email.");
      return false;
    }
  
    // Check if phone is empty or only whitespace
    if (!phone || phone.trim() === "") {
      alert("Phone Number cannot be empty or blank.");
      return false;
    }
  
    // Validate phone
    const isPhoneValid = /^\d{10}$/.test(phone);
    if (!isPhoneValid) {
      alert("Invalid Phone Number. It must be 10 digits and contain only numbers.");
      return false;
    }
  
    // If all validations pass
    return true;
  }
  