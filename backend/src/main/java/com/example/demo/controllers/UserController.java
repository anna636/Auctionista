package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.services.UserService;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest/users")
@CrossOrigin// prefix all mappings with this value
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable long id) {
       Optional<User> user=userService.getById(id);
        if(user !=null){
            return ResponseEntity.ok(user);
        }
        else{
            return ResponseEntity.noContent().build();
        }

    }



   
}