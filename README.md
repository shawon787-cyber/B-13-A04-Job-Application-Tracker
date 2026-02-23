1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Answer: ID is unique — it can be used only once in a single page and Class can be used on multiple elements and the same class name can be applied to many elements.

2. How do you create and insert a new element into the DOM? if 
Answer: At first I create document.createElement() in a varible and modify it if needed then I insert it in by append() or appendChild().

3. What is Event Bubbling? And how does it work?
Answer: Event Bubbling is a process where an event starts from the target element and then “bubbles up” to its parent elements in the DOM

4. What is Event Delegation in JavaScript? Why is it useful?
Answer: Event Delegation is a process where a listener is added to a parent element to handle events of its child elements and it is very useful because  it can improves performance by reducing the number of event listener and its works in dynamically

5. What is the difference between preventDefault() and stopPropagation() methods?
Answer: preventDefault() prevents the element’s default action, while stopPropagation() stops the event from bubbling up or capturing down the DOM.
