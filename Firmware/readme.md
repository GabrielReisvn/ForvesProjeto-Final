Passo 1: Instalar a Extensão no VS Code
Abra o VS Code.

Acesse a aba de Extensões na barra lateral esquerda (Ctrl + Shift + X).
Procure por PlatformIO IDE e clique em Instalar (o ícone é a cabeça de um alien alienígena de robô).
Aguarde a instalação terminar (o VS Code pode pedir para reiniciar).

Passo 2: Criar o Projeto
Clique no ícone de Alien (PlatformIO) que surgiu no menu lateral do VS Code e vá em Open -> PIO Home.

Clique no botão + New Project.
Preencha os campos:
Name: Firmware (ou o nome que desejar)
Board: Selecione Espressif ESP32 Dev Module (é o modelo padrão da maioria das placas ESP32)
Framework: Selecione Arduino

Location: Desmarque "Use default location" e escolha a pasta Firmware do seu repositório.

Clique em Finish e aguarde baixar as dependências (pode levar 1 ou 2 minutos na primeira vez).

Passo 3: Configurar as Bibliotecas (platformio.ini)
O PlatformIO gerencia bibliotecas automaticamente! No seu projeto, abra o arquivo platformio.ini na raiz da pasta Firmware e substitua o conteúdo por este:

Ini, TOML
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200

lib_deps =
    miguelbalboa/MFRC522 @ ^1.4.11
    madhephaestus/ESP32Servo @ ^3.0.5
Nota: A biblioteca SPI.h já vem padrão no ESP32, então só precisamos adicionar a MFRC522 e a ESP32Servo no campo lib_deps.

Passo Passo 4: Adicionar o seu Código
Na barra lateral de arquivos, abra a pasta src e clique no arquivo main.cpp.

Cole exatamente o seu código dentro dele. Fica assim:

C++
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
(Adicionamos apenas #include  no topo, pois no PlatformIO é obrigatório).

Passo 5: Gravar no ESP32 e Testar!
Na barra inferior azul do VS Code, você verá alguns ícones úteis:

✓ (Build): Compila o código para testar se há erros de sintaxe.

→ (Upload): Conecte o ESP32 no cabo USB do computador e clique na seta → para gravar o programa na placa.

🔌 (Serial Monitor / Tomada): Abre o terminal Serial para ver os Serial.println que você colocou no código ao aproximar a tag RFID.