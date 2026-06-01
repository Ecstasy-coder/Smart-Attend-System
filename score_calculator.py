def calculate_score(active, idle):
    total = active + idle
    if total == 0:
        return 0

    return round((active / total) * 100, 2)