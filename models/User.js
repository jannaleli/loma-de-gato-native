class User {
    constructor(user_id, address, attachment_id, birthdate,civil_status, contact_no, control_no, createdate, firstname,
        gender, gross_income, height, lastname, mobilenumber, password, place_of_birth, profession, tin_no, username, weight,
        zipcode) {
        this.user_id = user_id;
        this.address = address;
        this.attachment_id = attachment_id;
        this.birthdate = birthdate;
        this.civil_status = civil_status;
        this.contact_no = contact_no;
        this.control_no = control_no;
        this.createdate = createdate;
        this.firstname = firstname;
        this.gender = gender;
        this.gross_income = gross_income;
        this.height = height;
        this.lastname = lastname;
        this.mobilenumber = mobilenumber;
        this.password = password;
        this.place_of_birth = place_of_birth;
        this.profession = profession;
        this.tin_no = tin_no;
        this.username = username;
        this.weight = weight;
        this.zipcode = zipcode;
      }
}

export default User;