const BASE_URL=process.env.REACT_APP_BASE_URL
export const categories={
    CATEGORIE_API:BASE_URL+"/course/showAllCategories"
}
export const auth={
    RESETPASSWORDTOKEN_API:BASE_URL+"/user/reset-password-token",
    RESETPASSWORD_API:BASE_URL+"/user/reset-password",
    UPDATEPASSWORD_API:BASE_URL+"/user/update-password",
    SENDOTP_API:BASE_URL+"/user/sendotp",
    SIGNUP_API:BASE_URL+"/user/signup",
    LOGIN_API:BASE_URL+"/user/login"
}



export const setting={
    UPDATEDISPLAY_PICTURE:BASE_URL+"/profile/updateDisplayPicture",
    DELETE_PROFILE:BASE_URL+"/profile/deleteProfile",
    UPDATE_PROFILE:BASE_URL+"/profile/updateProfile",
    CHANGEPASSWORD:BASE_URL+"/user/changepassword"
}

export const courses={
    GETENROLLEDCOURSES:BASE_URL+"/course/getAllCourses",
    GETALLCATEGORIES:BASE_URL+"/course/showAllCategories",
    EDITCOURSE:BASE_URL+"/course//editCourse",
    CREATECOURSE:BASE_URL+"/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/createSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API:BASE_URL+"/course/getInstructorCourses",
    DELETE_COURSE_API:BASE_URL+"/course/deletecourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:BASE_URL+"/course/getCourseDetails",
    GET_COURSE_INFORMATION:BASE_URL+"/course/getCourseInformation",
    GET_USER_ENROLLED_COURSES_API:BASE_URL+"/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DASHBOARD:BASE_URL+"/profile/instructordashboard",
    CREATE_RATING_API:BASE_URL+"/course/createRating",
    LECTURE_COMPLETION_API:BASE_URL+"/course/updatecourseprogress",
GET_REVIEWS:BASE_URL+"/course/getReviews"

}

export const category={
    CATEGORYPAGEDETAILS:BASE_URL+"/course/getCategoryPageDetails"
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifySignature",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  };

