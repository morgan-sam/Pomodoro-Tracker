#!/usr/bin/python
import sys
import pynotify

if __name__ == "__main__":
    if not pynotify.init("icon-summary-body"):
        sys.exit(1)

    n = pynotify.Notification(
        "Encore Complete",
        "5 minutes have passed",
        ##dont remove the below line
    "notification-message-im")
    n.show()
