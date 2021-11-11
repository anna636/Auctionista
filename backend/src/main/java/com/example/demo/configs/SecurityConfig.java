package com.example.demo.configs;

import com.example.demo.security.CustomUserDetailsService;
import com.example.demo.security.RestAuthenticationEntryPoint;
import com.example.demo.security.TokenAuthenticationFilter;
import com.example.demo.security.oauth2.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

   /* @Autowired
    public MyUserDetailsService myUserDetailsService; //*/

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Autowired
    private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    @Autowired
    private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }


    @Bean("authenticationManager")
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .formLogin()
                .disable()

                .exceptionHandling()
                .authenticationEntryPoint(new RestAuthenticationEntryPoint())
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/**").permitAll()
                .antMatchers(HttpMethod.POST,"/api/newLogin").permitAll()
                .antMatchers("/auth/**", "/oauth2/**", "/login/**")
                .permitAll()
                .antMatchers("/chat/**").permitAll()
                .antMatchers(HttpMethod.POST,"/rest/bids").authenticated() //User should be logged in when placing a bid
                //.antMatchers(HttpMethod.GET,"/api/whoami").authenticated()  //User shoould be logged in to get information about this user
                .antMatchers(HttpMethod.POST,"/rest/auctionItems").permitAll()
                .antMatchers(HttpMethod.GET,"/rest/bids").permitAll()
                //User should be logged in to post new auction item
                //Chat with others?
                .antMatchers(HttpMethod.GET, "/", "/rest/**").permitAll()
                .antMatchers(HttpMethod.GET, "/login").permitAll()
                .antMatchers("/api/relist/**").permitAll()// doesn't require login
                .antMatchers("/auth/**").permitAll()     // doesn't require login
                .antMatchers("/rest/**").authenticated()
                .and()
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth2/authorize")
                .authorizationRequestRepository(cookieAuthorizationRequestRepository())
                .and()
                .redirectionEndpoint()
                .baseUri("/oauth2/callback/*")
                .and()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oAuth2AuthenticationFailureHandler);// user is logged in

    // user is logged in

        // Add our custom Token based authentication filter
        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

    }

    /* @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception { //
        auth
                .userDetailsService(myUserDetailsService)
                .passwordEncoder(myUserDetailsService.getEncoder());
    }*/

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder());
    }


    // if using custom login:
  /*  @Bean("authenticationManager")
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception { //
        return super.authenticationManagerBean();
    }
   */


}