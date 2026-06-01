import time
from pynput import mouse, keyboard

class IdleDetector:
    def __init__(self):
        self.last_activity = time.time()

        keyboard.Listener(on_press=self.activity).start()
        mouse.Listener(on_move=self.activity, on_click=self.activity).start()

    def activity(self, *args):
        self.last_activity = time.time()

    def is_idle(self):
        return (time.time() - self.last_activity) > 5  # 5 sec demo