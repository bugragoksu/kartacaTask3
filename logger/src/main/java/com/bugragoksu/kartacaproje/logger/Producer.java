package com.bugragoksu.kartacaproje.logger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

@Service
public class Producer {
    private static final Logger logger = LoggerFactory.getLogger(Producer.class);
    private static final String TOPIC = "users";


    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(String message) {
        LocalDateTime dateTime = LocalDateTime.now();
        logger.info(String.format("#### -> Producing message at %s -> %s", dateTime.toLocalTime().toString(), message));
        this.kafkaTemplate.send(TOPIC, message);
    }
}
