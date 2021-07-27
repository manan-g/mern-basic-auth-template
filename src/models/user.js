//jshint esversion:6
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true,'First Name is required'],
            trim: true, //remove white space
            max: 30,
            min: 3,
        },
        lastName: {
            type: String,
            trim: [true,'Last Name is required'], //remove white space
            max: 30,
            min: 3,
        },
        username: {
            type: String,
            required: [true, 'Email is Required'],
            unique: [true,'Enter Another Email Address'],
            lowercase: true,
            trim: true,
            max: 40,
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                        v
                    );
                },
                message: "Please enter a valid email",
            },
        },
        // username: {
        //   type: String,
        //   required: true,
        //   unique: true,
        //   trim: true,
        //   index: true,
        // },
    },
    { timestamps: true }
);

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

//plugin to create salt and hash using the password field
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
