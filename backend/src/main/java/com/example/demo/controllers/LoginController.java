package com.example.demo.controllers;


import com.example.demo.entities.User;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LoginController {

    @Autowired
    private UserService userService;


    @PostMapping("/login")
    public User login(@RequestBody User user, HttpServletRequest req){
        return userService.login(user, req);
    }

    @GetMapping("/whoami")
    public User whoami(){
        return userService.findCurrentUser();


    }

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return userService.createUser(user);
    }


}
