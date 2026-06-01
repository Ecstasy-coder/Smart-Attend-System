from idle_detector import IdleDetector
from app_monitor import AppMonitor
from url_tracker import URLTracker
from score_calculator import calculate_score
from database import save_data
import time
from datetime import datetime

employee_id = "EMP001"

idle = IdleDetector()
apps = AppMonitor()
urls = URLTracker()

active_time = 0
idle_time = 0

print("\n==============================")
print(" PRODUCTIVITY TRACKING STARTED ")
print("==============================\n")

while True:
    time.sleep(1)

    idle_state = idle.is_idle()

    if idle_state:
        idle_time += 1
        status = "🟡 IDLE"
    else:
        active_time += 1
        status = "🟢 ACTIVE"

    apps.track()
    urls.track()

    print(f"{status} | Active: {active_time}s | Idle: {idle_time}s")