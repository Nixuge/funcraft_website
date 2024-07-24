valid_chars = "0123456789_-abcdefghijklmnopqrstuvwxyz"
def has_invalid_chars(table_name: str):
    for char in table_name:
        if char not in valid_chars:
            return True
    return False