package com.example.ETK_trello_clone_backend;

public class NotFoundException extends RuntimeException{
    public NotFoundException(String messages) {
            super(messages);
        }
}
