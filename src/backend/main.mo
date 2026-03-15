import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type Application = {
    name : Text;
    email : Text;
    phone : Text;
    course : Text;
    address : Text;
    dob : Text;
  };

  type Notice = {
    title : Text;
    content : Text;
    date : Text;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
    date : Text;
  };

  type Certificate = {
    id : Text;
    holderName : Text;
    course : Text;
    issuedDate : Text;
    verified : Bool;
  };

  type Result = {
    rollNumber : Text;
    marks : Nat;
    status : Text;
  };

  type StudentCredential = {
    username : Text;
    password : Text;
  };

  let applications = List.empty<Application>();
  let notices = List.empty<Notice>();
  let contactMessages = List.empty<ContactMessage>();

  let certificates = Map.empty<Text, Certificate>();
  let results = Map.empty<Text, Result>();
  let studentCredentials = Map.empty<Text, StudentCredential>();

  // Admission Form Submission
  public shared ({ caller }) func submitApplication(name : Text, email : Text, phone : Text, course : Text, address : Text, dob : Text) : async () {
    let application : Application = {
      name;
      email;
      phone;
      course;
      address;
      dob;
    };
    applications.add(application);
  };

  // Add Notice (Controller only)
  public shared ({ caller }) func addNotice(title : Text, content : Text, date : Text) : async () {
    if (not isController(caller)) { Runtime.trap("Unauthorized") };
    let notice : Notice = {
      title;
      content;
      date;
    };
    notices.add(notice);
  };

  // Get All Notices
  public query ({ caller }) func getNotices() : async [Notice] {
    notices.toArray();
  };

  // Contact Form Submission
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text, date : Text) : async () {
    let contactMessage : ContactMessage = {
      name;
      email;
      message;
      date;
    };
    contactMessages.add(contactMessage);
  };

  // Certificate Verification
  public query ({ caller }) func verifyCertificate(id : Text) : async (Bool, Text) {
    switch (certificates.get(id)) {
      case (null) { (false, "Certificate not found") };
      case (?cert) { (cert.verified, cert.holderName) };
    };
  };

  // Result Checking
  public query ({ caller }) func checkResult(rollNumber : Text) : async (Nat, Text) {
    switch (results.get(rollNumber)) {
      case (null) { Runtime.trap("Result not found") };
      case (?result) { (result.marks, result.status) };
    };
  };

  // Student Login
  public query ({ caller }) func studentLogin(username : Text, password : Text) : async Bool {
    switch (studentCredentials.get(username)) {
      case (null) { false };
      case (?cred) { cred.password == password };
    };
  };

  // Admin Functions (Controller only)
  public shared ({ caller }) func addCertificate(id : Text, holderName : Text, course : Text, issuedDate : Text, verified : Bool) : async () {
    if (not isController(caller)) { Runtime.trap("Unauthorized") };
    let certificate : Certificate = {
      id;
      holderName;
      course;
      issuedDate;
      verified;
    };
    certificates.add(id, certificate);
  };

  public shared ({ caller }) func addResult(rollNumber : Text, marks : Nat, status : Text) : async () {
    if (not isController(caller)) { Runtime.trap("Unauthorized") };
    let result : Result = {
      rollNumber;
      marks;
      status;
    };
    results.add(rollNumber, result);
  };

  public shared ({ caller }) func addStudentCredential(username : Text, password : Text) : async () {
    if (not isController(caller)) { Runtime.trap("Unauthorized") };
    let credential : StudentCredential = {
      username;
      password;
    };
    studentCredentials.add(username, credential);
  };

  func isController(caller : Principal) : Bool {
    caller.isController();
  };
};
