from time import sleep
from machine import Pin, PWM
import requests







MIN_DUTY = 0 # 5 percent of 65025 = 3251.25
MAX_DUTY = 10000 # 10 percent of 65025 = 6502.5


pwm = PWM(Pin(0))
pwm.freq(50)

current_position = 1600
one_setting_turn = 1600


def setServoCycle(position):
    pwm.duty_u16(position)
    sleep(1)

setServoCycle(current_position)



def change_temp(current_temp:int, desired_temp:int):
    global one_setting_turn
    global current_position
    
    temp_diff = desired_temp - current_temp
    setting_change = temp_diff//3
    degree_turn = setting_change * one_setting_turn
    
    degree_turn = degree_turn *-1
    
    if degree_turn < 0:
        if degree_turn > -1600:
            degree_turn = -1600
    
        if degree_turn < -8000:
            degree_turn = -8000
        
    else:
        if degree_turn < 1600:
            degree_turn = 1600
        
        if degree_turn > 8000:
            degree_turn = 8000

    current_position += degree_turn

    
    #turning motor
    setServoCycle(current_position)
    
    
    
while True:
    #Getting room temp
    sensor_temp = machine.ADC(4)
    
    #Converting to celsius
    conversion_factor = 3.3/(65535)
    reading  = sensor_temp.read_u16()*conversion_factor
    temperature = round(27 - (reading - 0.706)/0.001721,2)
    
    #Post request updating room temp
    room_temp = {'Temperature': temperature}
    post_request_url = 'https://eton-hackathon-backend.herokuapp.com/api/data/update-current-temperature'
    post_request = requests.post(post_request_url, json=room_temp)
    
    #Getting user data and desired room temp
    target_temp_url = 'https://eton-hackathon-backend.herokuapp.com/api/data/update-target-temperature'

    target_temp = requests.get(target_temp_url)
    target_temp = int(target_temp[1])
    
    #Changing room temperature
    change_temp(temperature, desired_room_temp)
    
    sleep(30)
    
    
    
    
    
    

    
    
    

