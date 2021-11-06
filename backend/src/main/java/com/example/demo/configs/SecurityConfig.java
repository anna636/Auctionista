package com.example.demo.configs;

import com.example.demo.controllers.UserController;
import com.example.demo.entities.User;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import java.util.HashSet;
import java.util.Set;

import static org.hibernate.criterion.Restrictions.and;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    public MyUserDetailsService myUserDetailsService;

    @Autowired
    public UserController userController;




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
                .antMatchers("/hello").authenticated()
                .antMatchers(HttpMethod.GET, "/login").permitAll()     // doesn't require login
                .antMatchers("/auth/**").permitAll()     // doesn't require login
                .antMatchers("/rest/**").authenticated() // user is logged in
                .antMatchers("/greet").authenticated() // user is logged in
        .and()
                .oauth2Login()
                .defaultSuccessUrl("http://localhost:3000")
                .userInfoEndpoint(userInfoEndpoint ->
                        userInfoEndpoint
                                .oidcUserService(this.oidcUserService())

                    );


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



    private OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
        final OidcUserService delegate = new OidcUserService();

        return (userRequest) -> {
            // Delegate to the default implementation for loading a user
            OidcUser oidcUser = delegate.loadUser(userRequest);

            OAuth2AccessToken accessToken = userRequest.getAccessToken();
            Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

            // TODO
            // 1) Fetch the authority information from the protected resource using accessToken
            // 2) Map the authority information to one or more GrantedAuthority's and add it to mappedAuthorities

            // 3) Create a copy of oidcUser but use the mappedAuthorities instead
            oidcUser = new DefaultOidcUser(mappedAuthorities, oidcUser.getIdToken(), oidcUser.getUserInfo());
            String [] parts=oidcUser.getEmail().split("@");

            try{
                myUserDetailsService.loadUserByUsername(parts[0]);
                userController.setUsername(parts[0]);
                System.out.println(userController.getUsername());



            }
            catch(Exception e){

                User newGoogleUser =User.builder().username(parts[0]).email(oidcUser.getEmail()).fullName(oidcUser.getFullName())
                        .password("123").build();
               myUserDetailsService.addUser(newGoogleUser);


            }
            return oidcUser;
        };
    }



}