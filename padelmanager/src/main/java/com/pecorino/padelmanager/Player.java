package com.pecorino.padelmanager;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data //Crea los Getters, Setters...
@NoArgsConstructor
@AllArgsConstructor
public class Player {
    private String licenseNumber;
    private String name;
    private String lastName;
    private String position;
    private String playerPreferences;
    private String captainNotes;
    private String email;
    private String phone;



    /*
    Se comenta a continuación cómo sería el constructor completo y el vacío para evitar problemas con Spring si no usáramos Lombok


    public Player(String licenseNumber, String name, String lastName, String position, String playerPreferences, String captainNotes, String email, String phone) {
        this.licenseNumber = licenseNumber;
        this.name = name;
        this.lastName = lastName;
        this.position = position;
        this.playerPreferences = playerPreferences;
        this.captainNotes = captainNotes;
        this.email = email;
        this.phone = phone;
    }

    //Constructor vacío para evitar problemas con Spring
    public Player () {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCaptainNotes() {
        return captainNotes;
    }
        
    public void setCaptainNotes(String captainNotes) {
        this.captainNotes = captainNotes;
    }
    */



}
