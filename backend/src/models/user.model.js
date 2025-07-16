import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false,
        default: function(){
            return getGravatarUrl(this.email);
        }
    }
});


function getGravatarUrl(email){
    // We have to setup gravatar srivice that provide us default profile picture.
}


const User = mongoose.model("User", userSchema);

export default User;

