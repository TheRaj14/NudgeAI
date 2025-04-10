
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, tasks } = await req.json();

    console.log("Received request with message:", message);
    console.log("Tasks context:", JSON.stringify(tasks).substring(0, 200) + "...");

    // Prepare context about tasks for the AI
    const taskSummary = tasks.map(task => 
      `- Task "${task.title}" (${task.priority} priority): ${task.completed ? "COMPLETED" : "PENDING"}` +
      `${task.description ? ` - ${task.description}` : ""}` +
      `${task.estimatedTime ? ` - Estimated time: ${task.estimatedTime} minutes` : ""}`
    ).join("\n");

    // Create the system prompt with task information and Lara's personality
    const systemPrompt = `
You are Lara, a friendly and helpful female AI assistant integrated into a task management app.
You have a warm, supportive personality and you're here to help users understand their tasks and productivity.

Here's the current user's task information:
${taskSummary}

TASK STATISTICS:
- Total tasks: ${tasks.length}
- Completed tasks: ${tasks.filter(t => t.completed).length}
- Pending tasks: ${tasks.filter(t => !t.completed).length}
- High priority tasks: ${tasks.filter(t => t.priority === 'high').length}
- Medium priority tasks: ${tasks.filter(t => t.priority === 'medium').length}
- Low priority tasks: ${tasks.filter(t => t.priority === 'low').length}

When responding to the user:
1. Be concise and friendly, using a conversational tone
2. Provide insights about their tasks when asked
3. Be encouraging about their progress
4. Offer actionable suggestions when appropriate
5. Use emoji occasionally to be friendly 😊
6. Keep your responses relatively brief (1-3 paragraphs)
7. Sign your responses as "- Lara 💫" at the end

DO NOT mention that you're an AI or model - simply respond as Lara, the user's task assistant.
`;

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("DeepSeek API error:", error);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response received from DeepSeek:", data.choices?.[0]?.message?.content.substring(0, 100) + "...");

    return new Response(
      JSON.stringify({
        response: data.choices?.[0]?.message?.content || "Sorry, I couldn't process your request."
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error in task-assistant function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
