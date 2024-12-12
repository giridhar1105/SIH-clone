const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

let otpStore = {};

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const contactSchema = new mongoose.Schema({
  category: String,
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/get-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();
  otpStore[email] = { otp, timestamp: Date.now() };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('OTP sent to your email!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending OTP. Please try again later.');
  }
});

app.post('/signup', async (req, res) => {
  const { username, email, password, otp } = req.body;

  const otpEntry = otpStore[email];
  if (!otpEntry || otpEntry.otp !== otp || Date.now() - otpEntry.timestamp > 30000) {
    return res.status(401).send('Invalid or expired OTP.');
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    delete otpStore[email];

    res.status(201).send('Signup successful!');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Error during signup. Please try again later.');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Incorrect password.');
    }

    res.status(200).send('Login successful!');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error during login. Please try again later.');
  }
});

app.post('/api/contact', async (req, res) => {
  const { category, name, email, message } = req.body;

  if (!category || !name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newContact = new Contact({ category, name, email, message });
  await newContact.save();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission from ${name}`,
    text: `Category: ${category}\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});















start


4
Computer Networks Laboratory (BCS502)
Department of AI&ML, BGSCET Page
10
import java.io.*;
import java.util.*;
class CRC
{
public static void main(String a[]) throws IOException
{
Scanner sc=new Scanner(System.in);
int[] message;
int[] gen;
int[] app_message;
int[] rem;
int[] trans_message;
int message_bits,gen_bits,total_bits;
System.out.println("Enter no bits in mwssage:");
message_bits=sc.nextInt();
message=new int [message_bits];
System.out.println("\nEnter message bits:");
for(int i=0; i<message_bits;i++)
message[i]= sc.nextInt();
System.out.println("\nEnter number of bits in gen:");
gen_bits= sc.nextInt();
gen=new int[gen_bits];
System.out.println("\nEnter gen bits:");
for(int i=0;i<gen_bits;i++)
gen[i]= sc.nextInt();
total_bits=message_bits+gen_bits-1;
app_message=new int[total_bits];
rem=new int[total_bits];
trans_message=new int[total_bits];
for(int i=0;i<message.length;i++)
app_message[i]=message[i];
System.out.println("\nMessage bits are:");
for(int i=0;i<message_bits;i++)
System.out.print("\t"+message[i]);
System.out.println("\nGenerators bits are:");
for(int i=0;i<gen_bits;i++)
System.out.print("\t"+gen[i])
  Computer Networks Laboratory (BCS502)
Department of AI&ML, BGSCET Page
11
System.out.println("\nAppended message is:");
for(int i=0;i<app_message.length;i++)
System.out.print("\t"+app_message[i]);
for(int j=0;j<app_message.length;j++)
rem[j]=app_message[j];
rem=computecrc(app_message,gen,rem);
for(int i=0;i<app_message.length;i++)
trans_message[i]=(app_message[i]^rem[i]);
System.out.println("\nTransmitted message from the transmitter is:");
for(int i=0;i<trans_message.length;i++)
System.out.print("\t"+trans_message[i]);
System.out.println("\nEnter received message of"+total_bits+"bits at receiver end:");
for(int i=0;i<trans_message.length;i++)
trans_message[i]= sc.nextInt();
System.out.println("\nReceived message is:");
for(int i=0;i<trans_message.length;i++)
System.out.print("\t"+trans_message[i]);
for(int j=0;j<trans_message.length;j++)
rem[j]=trans_message[j];
rem=computecrc(trans_message,gen,rem);
for(int i=0;i<rem.length;i++)
{
if(rem[i]!=0)
{
System.out.println("\nThere is error in the received message");
break;
}
if(i==rem.length-1)
System.out.println("\nThere is no erron in the received mesage!!");
}
}
static int[] computecrc(int app_message[],int gen[], int rem[])
{
int current=0;
while(true)
{
for(int i=0;i<gen.length;i++)
rem[current+i]=(rem[current+i]^gen[i]);
while(rem[current]==0 && current!=rem.length-1
      Networks Laboratory (BCS502)
Department of AI&ML, BGSCET Page
12
current++;
if((rem.length-current)<gen.length)
break;
}
return rem;
}
}




5
Computer Networks Laboratory (BCS502)
Department of AI&ML, BGSCET Page
14
Server Program
import java.io.*;
import java.net.*;
import java.util.Random;
public class SlidingWindowServer {
private static final int PORT = 12345;
private static final int WINDOW_SIZE = 4;
private static final double PACKET_LOSS_RATE = 0.1; // 10% packet loss
public static void main(String[] args) {
try (ServerSocket serverSocket = new ServerSocket(PORT)) {
System.out.println("Server is running and waiting for connections...");
try (Socket clientSocket = serverSocket.accept();
BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true)) {
System.out.println("Client connected.");
String line;
int base = 0;
while ((line = in.readLine()) != null) {
if (simulatePacketLoss()) {
System.out.println("Packet " + line + " lost during transmission.");
} else {
System.out.println("Received packet: " + line);
// Simulate acknowledgment
if (base < WINDOW_SIZE) {
out.println("ACK: " + base);
base++;
}
}
Computer Networks Laboratory (BCS502)
Department of AI&ML, BGSCET Page
15
}
} catch (IOException e) {
e.printStackTrace();
}
}
private static boolean simulatePacketLoss() {
Random random = new Random();
return random.nextDouble() < PACKET_LOSS_RATE;
}
}
Client Program
import java.io.*;
import java.net.*;
import java.util.Scanner;
import java.util.Random;
public class SlidingWindowClient {
private static final String SERVER_ADDRESS = "localhost";
private static final int PORT = 12345;
private static final int WINDOW_SIZE = 4;
private static final double PACKET_LOSS_RATE = 0.1; // 10% packet loss
public static void main(String[] args) {
Scanner scanner = new Scanner(System.in);
try (Socket socket = new Socket(SERVER_ADDRESS, PORT);
PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {
System.out.println("Connected to server.");
System.out.println("Enter packets (type 'exit' to quit):");
int base = 0
  Computer Networks Laboratory (BCS502)
Department of AI&ML, BGSCET Page
16
while (true) {
if (base >= WINDOW_SIZE) {
// Wait for acknowledgment
String ack = in.readLine();
if (ack != null) {
System.out.println("Received " + ack);
base++;
}
}
String packet = scanner.nextLine();
if (packet.equalsIgnoreCase("exit")) {
break;
}
if (simulatePacketLoss()) {
System.out.println("Packet " + packet + " lost during transmission.");
} else {
System.out.println("Sending packet: " + packet);
out.println(packet);
}
}
} catch (IOException e) {
e.printStackTrace();
}
}
private static boolean simulatePacketLoss() {
Random random = new Random();
return random.nextDouble() < PACKET_LOSS_RATE;
}


6
Computer Networks Laboratory (BCS502)
Department of CSE, RNSIT Page 19
import java.util.Scanner;
public class BellmanFord
{
private int D[];
private int NoV;
public static final int MAX_VALUE = 999;
public BellmanFord(int NoV)
{
this.NoV = NoV;
D = new int[NoV + 1];
}
public void BellmanFordEvaluation(int source, int A[][])
{
for (int node = 1; node <= NoV; node++)
{
D[node] = MAX_VALUE;
}
D[source] = 0;
for (int node = 1; node <= NoV - 1; node++)
{
for (int i = 1; i <= NoV; i++)
{
for (int j = 1; j <= NoV; j++)
{
if (A[i][j] != MAX_VALUE)
{
if (D[j] > D[i] + A[i][j])
D[j] = D[i]+ A[i][j];
}
}
}
}}
for (int i = 1; i <= NoV; i++)
{
for (int j = 1; j <= NoV; j++)
{
if (A[i][j] != MAX_VALUE)
{
if (D[j] > D[i]+ A[i][j])
{
egde cycle");
System.out.println("The Graph contains negative
return;

  】
  Computer Networks Laboratory (BCS502)
Department of CSE, RNSIT Page 20
}
}
}
for (int vertex = 1; vertex <= NoV; vertex++)
{
System.out.println("distance of source " + source + " to "+ vertex + " is "
+ D[vertex]);
}
}
public static void main(String... arg)
{
int NoV = 0;
int source;
Scanner scanner = new Scanner(System.in);
System.out.println("Enter the number of vertices");
NoV = scanner.nextInt();
int A[][] = new int[NoV + 1][NoV + 1];
System.out.println("Enter the adjacency matrix");
for (int i = 1; i <= NoV; i++)
{
for (int j = 1; j <= NoV; j++)
{
A[i][j] = scanner.nextInt();
}
}
System.out.println("Enter the source vertex");
source = scanner.nextInt();
BellmanFord bellmanford = new BellmanFord(NoV);
bellmanford.BellmanFordEvaluation(source, A);
scanner.close();
}



7
Computer Networks Laboratory (BCS502)
Department of CSE, RNSIT Page 22
7. Using TCP/IP sockets, write a client – server program to make the client send the file name and to make 
the server send back the contents of the requested file if present.
Server.java
import java.net.*;
import java.io.*;
public class TCPS
{
public static void main(String[] args) throws Exception
{
ServerSocket sersock=new ServerSocket(4000);
System.out.println("Server ready for connection");
Socket sock=sersock.accept();
System.out.println("Connection Is successful and waiting for chatting");
InputStream istream=sock.getInputStream();
BufferedReader fileRead=new BufferedReader(new InputStreamReader(istream));
String fname=fileRead.readLine();
BufferedReader ContentRead=new BufferedReader(new FileReader(fname));
OutputStream ostream=sock.getOutputStream();
PrintWriter pwrite=new PrintWriter(ostream,true);
String str;
while((str=ContentRead.readLine())!=null)
{
pwrite.println(str);
}
sock.close();
sersock.close();
pwrite.close();
fileRead.close();
ContentRead.close();
}
}
Client.java
import java.net.*;
import java.io.*;
public class TCPC
{
public static void main(String[] args) throws Exception
{
Socket sock=new Socket("127.0.01",4000);
System.out.println("Enter the filename");
BufferedReader keyRead=new BufferedReader(new InputStreamReader(System.in));
String fname=keyRead.readLine();
OutputStream ostream=sock.getOutputStream();
PrintWriter pwrite=new PrintWriter(ostream,true)
  Computer Networks Laboratory (BCS502)
Department of CSE, RNSIT Page 23
pwrite.println(fname);
InputStream istream=sock.getInputStream();
BufferedReader socketRead=new BufferedReader(new InputStreamReader(istream));
String str;
while((str=socketRead.readLine())!=null)
{
System.out.println(str);
}
pwrite.close();
socketRead.close();
keyRead.close();
}



8
Computer Networks Laboratory (BCS502)
Department of CSE, RNSIT Page 25
//UDP Server Source code:
import java.io.*;
importjava.net.*;
importjava.util.*;
public class udps
{
publicstaticvoid main(String[]args)
{
DatagramSocketskt=null;
Scannersc=newScanner(System.in); try
{
skt=newDatagramSocket(2400); byte[] buffer=new
byte[1000]; while(true)
{
DatagramPacketrequest=newDatagramPacket(buffer,buffer.length);
skt.receive(request);
Stringmessage=sc.nextLine();
byte[]sendMsg=message.getByte
s(); DatagramPacket reply=new
DatagramPacket(sendMsg,sendMsg.length,request.getAddress(),request.getPort());
skt.send(reply);
}
}
catch(Exceptionex)
{
}
}
}
UDP Client Source code:
import java.io.*;
importjava.net.*;
publicclassudpc
{
publicstaticvoid main(String[]args)
{
DatagramSocketskt;
try
{
skt=new DatagramSocket();
Stringmsg="textmessage";
byte[]b=msg.getBytes();
InetAddresshost=InetAddress.getByName("127.0.0.1");
intserverSocket=2400;
DatagramPacketrequest=newDatagramPacket(b,b.length,host,serverSocket);
skt.send(request);
byte[]buffer=newbyte[1000]
  Computer Networks Laboratory (BCS502)
Department of CSE, RNSIT Page 26
DatagramPacketreply=newDatagramPacket(buffer,buffer.length);
skt.receive(reply);
System.out.println("clientrecieved:"+newString(reply.getData()));
skt.close();
}
catch(Exceptionex){}
}


9
  Computer Networks Laboratory (BCS502)
Department of CSE, RNSIT Page 28
importjava.util.Scanner;
public class RSA
{
publicstaticintp,q,n,t,flag,msg,m,temp;
public staticint e[]=new int[100];
public staticint d[]=new int[100];
public static int prime( intpr)
{
inti;
Doublea=(Math.sqrt(p
r)); m=a.intValue();
for(i=2;i<=m;i++)
{
if(pr%i==0)
return0;
}
return1;
}
publicstaticvoidce()
{
intk=0;
for(inti=2;i<t;i++)
{
if(t%i==0)
conti
nue;
flag=prime(i
);
if(flag==1&&i!=p&&i!=q)
{
e[k]=i;
flag=cd(e[k]);
if(flag>0)
{
d[k]=fl
ag;
k++
Computer Networks Laboratory (BCS502)
Department of CSE, RNSIT Page 29
break;
}
}
}
}
if(k==99)
publicstaticintcd( intx)
{
intk=1;
while(true)
{
k=k+t;
if(k%x==0)
return(k/x);
}
}
publicstaticvoid encrypt()
{
intpt,ct,key=e[0],k;
pt=msg;
k=1;
for(intj=0;j<key;j++)
{
k=k*pt;
k=k%n;
}
ct=k;
temp
=ct;
System.out.println("\nTHEENCRYPTEDMESSAGEIS:"+ct);
}
Publicstatic void decrypt()
{
intpt,ct,key=d[0],k;
ct=temp
Computer Networks Laboratory (BCS502)
Department of CSE, RNSIT Page 30
k=1;
for(intj=0;j<key;j++)
{
k=k
*ct;
k=k
%n;
}
pt=k;
System.out.println("\nTHEDECRYPTEDMESSAGEIS:"+pt);
}
publicstaticvoidmain(Stringargs[])
{
Scanner sc=new Scanner(System.in);
System.out.println("ENTERFIRSTPRIMENUMBER"
); p=sc.nextInt();
flag=prime(p);
if(flag==0)
{
System.out.println("WRONGINPU
T"); System.exit(1);
}
System.out.println("ENTERANOTHERPRIMENUMBER");
q=sc.nextInt();
flag=prime(q);
if(flag==0||p==q)
{
System.out.println("WRONGINPU
T"); System.exit(1);
}
System.out.println("ENTERMESSAG
E"); msg=sc.nextInt();
n=p*q;
t=(p-1)*(q-1);
ce();
System.out.println("POSSIBLEVALUESOFeANDdARE");
for (int i=0;i< m-1;i++)
System.out.printf("\n%d\t%d",e[i],d[i]);
encrypt()
  
Computer Networks Laboratory (BCS502)
Department of CSE, RNSIT Page 30
k=1;
for(intj=0;j<key;j++)
{
k=k
*ct;
k=k
%n;
}
pt=k;
System.out.println("\nTHEDECRYPTEDMESSAGEIS:"+pt);
}
publicstaticvoidmain(Stringargs[])
{
Scanner sc=new Scanner(System.in);
System.out.println("ENTERFIRSTPRIMENUMBER"
); p=sc.nextInt();
flag=prime(p);
if(flag==0)
{
System.out.println("WRONGINPU
T"); System.exit(1);
}
System.out.println("ENTERANOTHERPRIMENUMBER");
q=sc.nextInt();
flag=prime(q);
if(flag==0||p==q)
{
System.out.println("WRONGINPU
T"); System.exit(1);
}
System.out.println("ENTERMESSAG
E"); msg=sc.nextInt();
n=p*q;
t=(p-1)*(q-1);
ce();
System.out.println("POSSIBLEVALUESOFeANDdARE");
for (int i=0;i< m-1;i++)
System.out.printf("\n%d\t%d",e[i],d[i]);
encrypt()
