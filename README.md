# ScribeAR Landing Page

Welcome to ScribeAR! This README provides an overview of the landing page structure and offers guidance for future developers on how to make updates or changes.

## Project Structure

The project consists of the following key components:

    .
    ├── index.html                    # The entry point of the landing page
    ├── /frameworks                   # Contains all other related files required for the functioning and styling of the landing page.
    │   ├── /images                   # Stores all the images utilized in the application.
    │   │   ├── /members              # Specifically stores images of all the current members.
    │   ├── /script                   # Houses all the JavaScript code supporting the functionality of the landing page.
    │   ├── /style                    # Contains all the CSS files responsible for styling the landing page.
    │   │   ├── /components           # CSS for small, reusable components like member cards.
    │   │   ├── /layout               # CSS for larger layout elements, such as headers and footers.
    │   │   ├── /sections                # CSS specific to each section of the page


## Modifying Member Cards

If you wish to change the images or details associated with the member cards, follow these steps:

1. **Update Member Photos**:
   - Place new photos of the current members in the `/framework/images/members/` directory.

2. **Update Current Members' Information**:
   - Edit the `currentMembersInfo` array in the `/framework/script/index.js` file.
   - Each object within the array should have the following key-value pairs:
     - `photo`: Relative path to the member's photo. For example, `framework/images/members/[name].jpg`.
     - `name`: The full name of the member.
     - `description`: Includes details such as the member's graduation year and major.

```javascript
const currentMembersInfo = [
   { 
      photo: "framework/images/members/isaac-zheng.jpg", 
      name: "Isaac Zheng", 
      description: "'25 Computer Science" 
   },
   // Add more members as needed
];
```

3. **Update Past Members**:
   - you can also update the `pastMembers` array with names of previous team members.

```javascript
const pastMembers = [
   "Member 1", "Member 2", "Member 3"
   // Add or remove names as required
];
```

## Contact

For any questions, issues, or assistance, please reach out to Colin or me (zheng72@illinois.edu or isaaczheng0414@gmail.com). I hope this documentation helps you seamlessly work with and further develop the landing page.
