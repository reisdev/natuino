#include <DHT.h>
#include <SoftwareSerial.h>

SoftwareSerial BTNative(10,11); // Tx and Rx
DHT dht(7,DHT11);
String command;
int counter = 0;

float t;

void setup() {
  Serial.begin(9600);
  Serial.println("Serial inicializado...");
  BTNative.begin(9600);
  Serial.println("Bluetooth inicializado...");
  dht.begin();
  Serial.println("DHT inicializado...");
}

void loop() {

  if(counter % 50 == 0){
    t = dht.readTemperature();
    BTNative.print("Temperature: ");
    BTNative.print(t);
    BTNative.println(" C");
    counter += 1;
  }else counter += 1;
}
