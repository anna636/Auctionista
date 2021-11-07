package com.example.demo.controllers;


import com.example.demo.entities.User;
import com.example.demo.payload.AuthResponse;
import com.example.demo.payload.LoginRequest;
import com.example.demo.repositories.UserRepository;
import com.example.demo.security.TokenProvider;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {


    @Autowired
    private UserService userService;


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;


    @PostMapping("/login")
    public User login(@RequestBody User user, HttpServletRequest req){
        return userService.login(user, req);
    }

    @PostMapping("/newlogin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token));
    }


    @GetMapping("/whoami")
    public User whoami(){
        return userService.findCurrentUser();


    }


    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user){

            return userService.createUser(user);


    }


}
