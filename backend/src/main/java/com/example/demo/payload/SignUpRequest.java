package com.example.demo.payload;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */

public class SignUpRequest {
    @NotBlank
    private String fullName;



    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String name) {
        this.fullName= name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}