
class Complaints {
    constructor(complaint_id, attachment_id, complaint_desc, create_date, latitude, longitude, status, type, user_id) {
        this.complaint_id = complaint_id;
        this.attachment_id = attachment_id;
        this.complaint_desc = complaint_desc;
        this.create_date = create_date;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
        this.type = type;
        this.user_id = user_id;
        
      }
}



export default Complaints;