interface ServerResponse {
  counter: number;
}

enum Button {
  Button1 = "button1",
  Button2 = "button2",
}

document.getElementById(Button.Button1)?.addEventListener("click", () => sendClickedButtonID(Button.Button1));
document.getElementById(Button.Button2)?.addEventListener("click", () => sendClickedButtonID(Button.Button2));

async function sendClickedButtonID(buttonId: string): Promise<void> {
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ buttonId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const serverResponse: ServerResponse = await response.json();

    if (buttonId === Button.Button1) {
      const p1 = document.getElementById("p1");
      if (p1) p1.innerText = `Counter button1: ${serverResponse.counter}`;
    } else if (buttonId === Button.Button2) {
      const p2 = document.getElementById("p2");
      if (p2) p2.innerText = `Counter button2: ${serverResponse.counter}`;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
