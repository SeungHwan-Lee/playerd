package com.handy.erd.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SystemController implements ErrorController {

    private static final String PATH = "/error";

    @GetMapping({"/", PATH})
    public String index() {
        return "index";
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }

}
