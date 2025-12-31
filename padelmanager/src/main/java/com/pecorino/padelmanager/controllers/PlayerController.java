package com.pecorino.padelmanager.controllers;
import  com.pecorino.padelmanager.Player;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    @GetMapping
    public List<Player> getPlayers() {
        List<Player> team = new ArrayList<>();
        team.add(new Player("001", "Nacho", "Vázquez", "Reves", "Experto en globos", "Capitán del equipo", "nacho@example.com", "600000001"));
        team.add(new Player("002", "Javi", "García", "Drive", "Muy rápido en la red", "Buen compañero", "javi@example.com", "600000002"));
        team.add(new Player("003", "Ale", "Martínez", "Indistinto", "Saque potente", "Versátil", "ale@example.com", "600000003"));
        return team;
    }
}
