#include 
#include 
#include 
#include 

// Pinos MFRC522 (Padrão SPI no ESP32)
#define SS_PIN   5
#define RST_PIN  22

// Pino de Sinal do Servo Motor
#define SERVO_PIN 12

MFRC522 rfid(SS_PIN, RST_PIN);
Servo tranca;

void setup() {
  Serial.begin(115200);

  SPI.begin();
  rfid.PCD_Init();

  tranca.attach(SERVO_PIN);
  tranca.write(0); // 0° = Trancado

  Serial.println("Aproxime a tag RFID...");
}

void loop() {
  // Aguarda a leitura de uma nova tag RFID
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
    return;
  }

  // Exibe a UID lida no Monitor Serial
  Serial.print("Tag detectada UID:");
  for (byte i = 0; i < rfid.uid.size; i++) {
    Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
    Serial.print(rfid.uid.uidByte[i], HEX);
  }
  Serial.println();

  // Executa a abertura para o teste basico
  Serial.println("Acesso Liberado!");
  tranca.write(90); // 90° = Destrancado
  delay(5000);      // Mantém aberto por 5 segundos

  Serial.println("Trancando...");
  tranca.write(0);  // Retorna para Posição Trancada
  Serial.println("Trancado!");

  // Finaliza a comunicação com a tag atual
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}