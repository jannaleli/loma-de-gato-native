class Permit {
    constructor(    username, user_id, approval_date, business_activity, business_building_no, business_name, business_street, 
                    capitalization,ctc_no, gross_sale,lessor_barangay, lessor_bldg_no,lessor_city,lessor_emailaddr,lessor_name,
                    lessor_province,lessor_street,lessor_subdv, monthly_rental,sec_no,status) {
        this.username = username;
        this.user_id = user_id;
        this.approval_date = approval_date;
        this.business_activity = business_activity;
        this.business_building_no = business_building_no;
        this.business_name = business_name;
        this.business_street = business_street;
        this.capitalization = capitalization;
        this.ctc_no = ctc_no;
        this.gross_sale = gross_sale;
        this.lessor_barangay = lessor_barangay;
        this.lessor_bldg_no = lessor_bldg_no;
        this.lessor_city = lessor_city;
        this.lessor_emailaddr = lessor_emailaddr;
        this.lessor_name = lessor_name;
        this.lessor_province = lessor_province;
        this.lessor_street = lessor_street;
        this.lessor_subdv = lessor_subdv;
        this.monthly_rental = monthly_rental;
        this.sec_no = sec_no;
        this.status = status;
      }
}

export default Permit;