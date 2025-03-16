// defines pins numbers
const int trigPin = 9;
const int echoPin = 10;
const int LED = 13;
// defines variables
long duration;
int distance;
void setup() {
pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
pinMode(LED , OUTPUT); //Sets the LED as an Output
pinMode(echoPin, INPUT); // Sets the echoPin as an Input
Serial.begin(9600); // Starts the serial communication
}
void loop() {
;
// Clears the trigPin
digitalWrite(trigPin, LOW);
delayMicroseconds(2);
// Sets the trigPin on HIGH state for 10 micro seconds
digitalWrite(trigPin, HIGH);
delayMicroseconds(3);
digitalWrite(trigPin, LOW);
// Reads the echoPin, returns the sound wave travel time in microseconds

duration = pulseIn(echoPin, HIGH);
// Calculating the distance
distance = calculateDistance();
// Prints the distance on the Serial Monitor
Serial.print("Distance: ");
Serial.println(distance);
//Power LED if distance threshold is met
if(distance <= 10)
{
  digitalWrite(LED, HIGH);
 }
 else{
  digitalWrite(LED, LOW);
  }

}
// Function for calculating the distance measured by the Ultrasonic sensor
int calculateDistance(){ 
  
  digitalWrite(trigPin, LOW); 
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH); 
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH); // Reads the echoPin, returns the sound wave travel time in microseconds
  distance= duration * 0.034/2;
  return distance;
}