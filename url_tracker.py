class URLTracker:
    def __init__(self):
        self.urls = []

    def track(self):
        # Demo URLs (browser tracking needs extra tools)
        self.urls = ["github.com", "stackoverflow.com"]

    def get_urls(self):
        return self.urls