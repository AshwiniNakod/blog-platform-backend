import mongoose from "mongoose";


const UserSchema  = mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Username is required.'],
        trim: true,
        // unique: true,
        // maxLength: [8, 'Please enter valid employee code. Please check.']
    },
    password: {
        type: String,
        // minLength: [8, 'Password is too short.'],
        required: [true, 'Password is must.'],
        trim: true,
    }, 
    userRole: {
        type: [ String ],
        required: [true, 'User role is required.'],
        trim: true,
        enum: {
            values:  ['ADMIN', 'USER'],
            message: "User role must be  ADMIN or USER"
            
        },
        default: ['USER'],
    },
},
{
    timestamps: true,
})
// create model 
const UserModel = mongoose.model('user', UserSchema);

// export section 
    export default UserModel