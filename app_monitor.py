class AppMonitor:
    def __init__(self):
        self.apps = []

    def track(self):
        # Demo apps (replace with psutil in real project)
        self.apps = ["VS Code", "Chrome", "Excel"]

    def get_apps(self):
        return self.apps