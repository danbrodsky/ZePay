from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
import time
import sys

if len(sys.argv) < 4:
	print("Not enough arguments specified.")
	print("Call format: python3 purchase.py $RECIPIENT $PAYMENT $NOTE")
	sys.exit(1)

emailStr = ''
passwordStr = ''

chromedriver = "./chromedriver"
os.environ["webdriver.chrome.driver"] = chromedriver

browser = webdriver.Chrome(chromedriver)
browser.get(('https://www.paypal.com/signin?country.x=US&locale.x=en_US'))

email = WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.ID, 'email')))

email.send_keys(emailStr)
password = browser.find_element_by_id('password')
password.send_keys(passwordStr)

signIn = browser.find_element_by_id('btnLogin')
signIn.click()

browser.get(('https://www.paypal.com/myaccount/transfer/buy'))

recipient = WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.ID, 'recipient')))

recipient.send_keys(sys.argv[1])


Next = browser.find_element_by_xpath("//input[@value='Next'][@type='submit']")
Next.click()

payment = WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.XPATH, "//input[@data-nemo='sender-pays-amount']")))

payment.send_keys(sys.argv[2])

note = browser.find_element_by_id('noteField')
note.send_keys(sys.argv[3])

time.sleep(1)
Continue = WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Continue')]")))
Continue.click()

Send = WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Send Money Now')]")))
Send.send_keys('\n')

time.sleep(4)
browser.close()
