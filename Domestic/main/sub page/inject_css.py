import os

html_file = "Singalila Ridge Trek.html"
bootstrap_file = "bootstrap.min.css"
fontawesome_file = "all.min.css"

# Read HTML
with open(html_file, "r", encoding="utf-8") as f:
    html_content = f.read()

# Read Bootstrap
with open(bootstrap_file, "r", encoding="utf-8") as f:
    bootstrap_css = f.read()

# Read FontAwesome
with open(fontawesome_file, "r", encoding="utf-8") as f:
    fontawesome_css = f.read()

# Fix FontAwesome paths
fontawesome_css = fontawesome_css.replace("../webfonts/", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/")

# Prepare replacement
target_start = '<!-- Required CSS -->'
target_end = '<style>'

# Find the range to replace
start_index = html_content.find(target_start)
end_index = html_content.find(target_end)

if start_index != -1 and end_index != -1:
    # We want to keep <style> tag but put our content after it?
    # No, the previous structure was:
    # <!-- Required CSS -->
    # <link ...>
    # <link ...>
    # <style>
    # /* custom css */
    
    # We want:
    # <!-- Required CSS -->
    # <style>
    # /* Bootstrap */
    # ...
    # /* FontAwesome */
    # ...
    # /* custom css */
    
    # So we replace from target_start up to target_end + len(target_end)
    # And then insert the new content + the original custom css?
    # Wait, the custom css follows <style>.
    
    # Let's replace everything from target_start to target_end (exclusive) with:
    # <!-- Required CSS -->
    # <style>
    # /* Bootstrap */
    # ...
    # /* FontAwesome */
    # ...
    # </style>
    # <style>
    
    # Or better, merge them into one style tag.
    
    # The existing file has:
    # <style>
    # /* Global Stylesheet ... */
    
    # So if we replace up to <style>, we are removing the opening <style> tag of the custom block.
    # So we should provide a new opening <style> tag, then our injected CSS, then the custom CSS follows.
    
    new_content = f"""{target_start}
<style>
/*! Bootstrap 5.3.0 */
{bootstrap_css}

/*! Font Awesome 6.4.0 */
{fontawesome_css}

"""
    # We replace from start_index to end_index + len(target_end)
    # This removes the old links AND the opening <style> tag.
    # The new content ends with the injected CSS.
    # The original content after end_index + len(target_end) starts with the custom CSS content (without <style> tag).
    
    # So the result will be:
    # ...
    # <style>
    # [Bootstrap]
    # [FontAwesome]
    # 
    # /* Global Stylesheet ... */
    # ...
    
    # This looks correct.
    
    replacement_range_end = end_index + len(target_end)
    
    final_html = html_content[:start_index] + new_content + html_content[replacement_range_end:]
    
    with open(html_file, "w", encoding="utf-8") as f:
        f.write(final_html)
    
    print("Successfully injected CSS.")

else:
    print("Could not find target markers.")
