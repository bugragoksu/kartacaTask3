package com.bugragoksu.kartacaproje.logger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class Consumer {

    private final Logger logger = LoggerFactory.getLogger(Producer.class);

    @KafkaListener(topics = "users", groupId = "group_id")
    public void consume(String message) throws IOException {
        LocalDateTime dateTime = LocalDateTime.now();
        logger.info(String.format("#### -> Consumed message at %s -> %s", dateTime.toLocalTime().toString(), message));
    }
}