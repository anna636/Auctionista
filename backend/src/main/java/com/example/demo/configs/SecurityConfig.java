package com.example.demo.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    public MyUserDetailsService myUserDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST,"/rest/bids").authenticated() //User should be logged in when placing a bid
                //.antMatchers(HttpMethod.GET,"/api/whoami").authenticated()  //User shoould be logged in to get information about this user
                .antMatchers(HttpMethod.POST,"/rest/auctionItems").permitAll()  //User should be logged in to post new auction item
                //Chat with others?
                .antMatchers(HttpMethod.GET, "/", "/rest/**").permitAll()
                .antMatchers(HttpMethod.GET, "/login").permitAll()     // doesn't require login
                .antMatchers("/auth/**").permitAll()     // doesn't require login
                .antMatchers("/rest/**").authenticated() // user is logged in
                .antMatchers("/greet").authenticated() // user is logged in
        ;
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(myUserDetailsService)
                .passwordEncoder(myUserDetailsService.getEncoder());
    }

    // if using custom login:
    @Bean("authenticationManager")
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}